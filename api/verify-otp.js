export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, email, phoneNumber, pageUrl, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ success: false, message: "Phone number and OTP are required" });
  }

  try {
    // ---------- Step 1: Verify OTP ----------
    const apiKey = "68f214b7760bd"; // check if still valid
    const verifyURL = `http://www.smsalert.co.in/api/mverify.json?apikey=${apiKey}&mobileno=${phoneNumber}&code=${otp}`;

    let verifyResult;

    try {
      const verifyResponse = await fetch(verifyURL, { method: "POST", redirect: "follow" });
      const text = await verifyResponse.text();

      try {
        verifyResult = JSON.parse(text);
      } catch {
        throw new Error(`SMS API returned invalid response: ${text}`);
      }

      if (verifyResult.status !== "success") {
        return res.status(400).json({
          success: false,
          message: verifyResult.description?.desc || "OTP verification failed",
        });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: "SMS verification failed: " + err.message });
    }

    // ---------- Step 2: Send data to Zoho ----------
    const webhookURL =
      "https://flow.zoho.com/899071440/flow/webhook/incoming?zapikey=1001.032298ac244ab16396c1ccb1793332ca.a6728157ec735e0e3955e6c335e8a9a2&isdebug=false";

    try {
      const zohoResponse = await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          Remote__IP: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
          Time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
          Date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          Name: name || "",
          Phone: phoneNumber,
          email: email || "",
          Page__URL: pageUrl || "",
        }).toString(),
      });

      if (!zohoResponse.ok) {
        throw new Error(`Zoho webhook failed with status ${zohoResponse.status}`);
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: "Failed to send data to Zoho: " + err.message });
    }

    // ---------- Step 3: Success ----------
    return res.status(200).json({ success: true, message: "OTP verified and data sent successfully" });
  } catch (err) {
    // catch any other unexpected errors
    return res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
}

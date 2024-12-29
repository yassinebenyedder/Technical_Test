const { google } = require("googleapis");

//this function is to connect and send the contactUs form to google sheet api
exports.ContactUs = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const { name, email, message } = body;
        // Authenticate with Google APIs
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            },
            scopes: [
                "https://www.googleapis.com/auth/drive",
                "https://www.googleapis.com/auth/drive.file",
                "https://www.googleapis.com/auth/spreadsheets",
            ],
        }); 
        const sheets = google.sheets({ auth, version: "v4" });
        const range = "A1:C1";
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[name, email, message]],
            },
        });
        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Error occurred while writing to Google Sheets:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

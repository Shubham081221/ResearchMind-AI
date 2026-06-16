import express from "express";
import PDFDocument from "pdfkit";

const router = express.Router();

router.post("/", async(req, res) => {
    try {
        const { query, report } = req.body;

        const doc = new PDFDocument();

        res.setHeader("Content-Type", "application/pdf");

        res.setHeader("Content-Disposition", `attachment; filename="${query}.pdf"`);

        doc.pipe(res);

        doc.fontSize(20).text(`Research Report: ${query}`, { underline: true });

        doc.moveDown();

        doc.fontSize(12).text(report);

        doc.end();
    } catch (error) {
        console.error("Error generating PDF:", error);

        res.status(500).json({
            success: false,
            error: error.message || "An error occured while generating the PDF.",
        });
    }
}
);

export default router;
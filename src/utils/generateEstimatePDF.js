import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Generate a quote estimate PDF and open it in a new tab
 * @param {object} estimate - The estimate object containing form data
 */
export const generateEstimatePDF = (estimate) => {
  const doc = new jsPDF();

  // Add logo (make sure logo.png is in public/)
  const logo = new Image();
  logo.src = '/logo.png'; // logo must be in public folder

  logo.onload = () => {
    doc.addImage(logo, 'PNG', 15, 10, 40, 20);

    doc.setFontSize(18);
    doc.text("Painting Quote Estimate", 70, 25);

    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 40);

    // Customer Info
    autoTable(doc, {
      startY: 50,
      head: [['Customer Info']],
      body: [
        [`Name: ${estimate.name}`],
        [`Phone: ${estimate.phone}`],
        [`Address: ${estimate.address}`],
        [`City/State: ${estimate.city}, ${estimate.state}`],
      ],
      theme: 'grid'
    });

    // Project Details
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Project Details']],
      body: [
        [`Square Feet: ${estimate.squareFeet} sqft`],
        [`Wall Height: ${estimate.height} ft`],
        [`Color: ${estimate.colorHex}`],
        [`Total Price: $${estimate.price}`],
        [`Notes: ${estimate.notes || 'N/A'}`],
        [`Status: ${estimate.status}`]
      ],
      theme: 'grid'
    });

    // Signature areas
    doc.setFontSize(12);
    doc.text("Customer Signature: _______________________", 15, doc.lastAutoTable.finalY + 30);
    doc.text("Company Representative: ____________________", 15, doc.lastAutoTable.finalY + 50);

    // Open PDF in new tab
    window.open(doc.output('bloburl'), '_blank');
  };
};

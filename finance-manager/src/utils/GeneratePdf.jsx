import jsPDF from "jspdf";
import { useSelector } from "react-redux";

export const GeneratePdf = () => {
  const inventoryItemList = useSelector(
    (state) => state.inventoryState.inventoryItems
  );
  const doc = new jsPDF();

  // Define the columns and rows for your table
  const columns = ["Name", "Price", "Quantity", "Total Price"];
  const data = inventoryItemList.map((item) => [
    item.name,
    item.price,
    item.quantity,
    item.price * item.quantity,
  ]);

  // Set the position and headers for the table
  doc.autoTable({
    head: [columns],
    body: data,
  });

  // Save the PDF or open in a new tab
  doc.save("inventory.pdf");

  return (
    <div>
      <button className="commonBtn" onClick={GeneratePdf}>
        Generate PDF
      </button>
    </div>
  );
};

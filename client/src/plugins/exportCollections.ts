import { BareCollectionQuery } from "@/graphql/graphql2";

function download(filename: string, text: string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export const exportToCsv = (
  collectionName: string,
  items: BareCollectionQuery
) => {
  const content = items.bareCollection.map(item => {
    const desc = item.description ? `"${item.description}"` : null;
    return `"${item.name}",${item.quantity},${desc},${item.barcode}`;
  });
  const res = `name,quantity,description,barcode\n${content.join("\n")}`;
  download(`${collectionName}.csv`, res);
};

export const exportToJson = (
  collectionName: string,
  items: BareCollectionQuery
) => {
  const content = items.bareCollection.map(item => ({
    name: item.name,
    quantity: item.quantity,
    description: item.description,
    barcode: item.barcode
  }));
  download(`${collectionName}.json`, JSON.stringify(content));
};

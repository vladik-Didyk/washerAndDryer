// The five machine types shown in the Machines section and offered in the request form.
// Drawings live in public/types/ (standalone SVGs, also used in social graphics).
export const machineTypes = [
  {
    id: "stackable",
    title: "Stackable pair",
    description:
      "Front-load washer with the dryer stacked on top. Good for narrow closets.",
    price: 50,
    priceNote: "for the set",
    image: "types/stackable.svg",
    alt: "Drawing of a front-load washer with a dryer stacked on top",
  },
  {
    id: "one-piece",
    title: "One-piece laundry centre",
    description:
      "Washer and dryer built as one unit, 24″ or 27″ wide. The usual condo-closet machine.",
    price: 50,
    priceNote: "for the set",
    image: "types/one-piece.svg",
    alt: "Drawing of a one-piece laundry centre: a dryer above a top-load washer in one cabinet",
  },
  {
    id: "side-by-side-front",
    title: "Side-by-side front-load",
    description: "Two machines next to each other. Big loads, easy to reach.",
    price: 50,
    priceNote: "for the set",
    image: "types/side-by-side-front.svg",
    alt: "Drawing of a front-load washer and dryer standing side by side",
  },
  {
    id: "side-by-side-top",
    title: "Side-by-side top-load",
    description: "Classic top-loader with a matching dryer. Simple and tough.",
    price: 50,
    priceNote: "for the set",
    image: "types/side-by-side-top.svg",
    alt: "Drawing of a top-load washer with a matching dryer",
  },
  {
    id: "single",
    title: "Washer or dryer only",
    description: "One machine to pair with what you already have.",
    price: 25,
    priceNote: null,
    image: "types/single.svg",
    alt: "Drawing of one washer next to the dashed outline of a machine you already have",
  },
];

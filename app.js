import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

axios
  .get("https://voodoo-sandbox.myshopify.com/products.json?limit=12")
  .then((response) => {
    const result = response.data;
    const productsCard = document.querySelector(".cards");
    const productsArray = result.products;
    const test = document.querySelector(".test");

    const getProductsObject = (array) =>
      array.reduce(
        (object, product) => ({
          ...object,
          [product.id]: product,
        }),
        {}
      );

    const getProductsObjectVariantsPrice = (array) =>
      array.reduce(
        (object, product) => ({
          ...object,
          [product.id]: {
            price: product.price,
            size: product.option1,
            color: product.option2,
          },
        }),
        {}
      );

    const getProductsObjectVariants = (array) =>
      array.reduce(
        (object, product) => ({
          ...object,
          [product.id]: {
            title: product.title,
            variants: getProductsObjectVariantsPrice(product.variants),
            image: product.images.map((el) => el.src),
          },
        }),
        {}
      );

    const productsObject = getProductsObject(productsArray);
    const productVariants = getProductsObjectVariants(productsArray);

    console.log(productsObject);
    console.log(productVariants);

    function includeSizeM(array) {
      if (array.includes("m")) {
        return "orange-200";
      } else {
        return "white";
      }
    }
    function includeSizeXS(array) {
      if (array.includes("xs")) {
        return "orange-200";
      } else {
        return "white";
      }
    }
    function includeSizeS(array) {
      if (array.includes("s")) {
        return "orange-200";
      } else {
        return "white";
      }
    }
    function includeSizeL(array) {
      if (array.includes("l")) {
        return "orange-200";
      } else {
        return "white";
      }
    }
    function includeSizeXL(array) {
      if (array.includes("xl")) {
        return "orange-200";
      } else {
        return "white";
      }
    }

    Object.keys(productVariants).map(
      (productId) =>
        (productsCard.innerHTML += `<div class="card flex flex-col gap-3">
      <div
        class="flex rounded bg-white bg-cover bg-no-repeat bg-center w-full h-[300px]  border border-solid border-black p-3"
      >
        <button
          class="bg-black w-[47px] h-[24px] text-lightSand text-center text-mainSize leading-[15px] font-normal rounded "
        >
          USED
        </button>
      </div>
      <div class="product-info flex justify-between">
        <div class="text-mainSize font-bold leading-main">
          <h3>${productVariants[productId].title}</h3>
          <h3>price</h3>
        </div>
        <div class="text-mainSize leading-main">
          <h3 class="font-normal">condition</h3>
          <h3 class="font-medium">rating</h3>
        </div>
      </div>
      <button class="bg-black text-white text-mainSize font-bold leading-main rounded w-full py-4">
        PICK-UP IN <span class="underline decoration-white">2200</span>
      </button>
      <div class="flex flex-col gap-y-6 pt-4">
      <div class="buttonSize grid grid-cols-3 gap-2.5">
        <button
          class="size active bg-${includeSizeXS(
            productsObject[productId].variants.map((el) => el.option1)
          )} rounded w-max-[60px] h-[30px] text-black text-mainSize leading-main font-normal"
          value="xs"
        >
          XS
        </button>
        <button
          class="size bg-${includeSizeS(
            productsObject[productId].variants.map((el) => el.option1)
          )} rounded w-max-[60px] h-[30px] text-black text-mainSize leading-main font-normal"
        >
          S
        </button>
        <button
          class="size bg-${includeSizeM(
            productsObject[productId].variants.map((el) => el.option1)
          )} rounded w-max-[60px] h-[30px] text-black text-mainSize leading-main font-normal"
        >
          M
        </button>
        <button
          class="size bg-${includeSizeL(
            productsObject[productId].variants.map((el) => el.option1)
          )} rounded w-max-[60px] h-[30px] text-black text-mainSize leading-main font-normal"
        >
          L
        </button>
        <button
          class="size bg-${includeSizeXL(
            productsObject[productId].variants.map((el) => el.option1)
          )} rounded w-max-[60px] h-[30px] text-black text-mainSize leading-main font-normal"
        >
          XL
        </button>
      </div>
      <div class="buttonColor grid grid-cols-3 gap-2.5">
        <button
          class="color active bg-orange-200 rounded w-max-[60px] h-[30px]  text-mainSize leading-main font-normal"
        >
          Red
        </button>
        <button
          class="color bg-orange-200 rounded w-max-[60px] h-[30px]  text-mainSize leading-main font-normal"
        >
          Blue
        </button>
      </div>
    </div>
    </div>`)
    );
  });

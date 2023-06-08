import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

axios
  .get("https://voodoo-sandbox.myshopify.com/products.json?limit=12")
  .then((response) => {
    const result = response.data;
    const productsCard = document.getElementById("productsCard");
    const productsArray = result.products;
    const cards = document.querySelectorAll(".card");

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
            product_id: product.product_id,
          },
        }),
        {}
      );

    const getProductsObjectVariants = (array) =>
      array.reduce(
        (object, product) => ({
          ...object,
          [product.id]: {
            id: product.id,
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

    function includeSize(array, size) {
      switch (array.includes(size)) {
        case true:
          return "";
          break;
        default:
          return "notAvailable";
          break;
      }
    }
    function includeColor(array, color) {
      switch (array.includes(color)) {
        case true:
          return "";
          break;
        default:
          return "notAvailable";
          break;
      }
    }

    Object.keys(productVariants).map(
      (productId) =>
        (productsCard.innerHTML += `<div class="card flex flex-col gap-3" id=${
          "card-" + productVariants[productId].id
        }>
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
          
        </div>
        <div class="text-mainSize leading-main">
          <h3 class="font-normal">condition</h3>
          <h3 class="font-medium">rating</h3>
        </div>
      </div>
      <button class="bg-black text-white text-mainSize font-bold leading-main rounded w-full py-4">
        PICK-UP IN <span class="underline decoration-white">2200</span>
      </button>
      <div class="buttonsBlock flex flex-col gap-y-6 pt-4">
      <div class="buttonSize grid grid-cols-3 gap-2.5" id="buttonSize">
        <button
          class="activeSize size ${includeSize(
            productsObject[productId].variants.map((el) => el.option1),
            "xs"
          )} rounded w-max-[60px] h-[30px] text-mainSize leading-main font-normal"
          value="xs" id='${productVariants[productId].id}' data-id='${
          "xs-" + productVariants[productId].id
        }'
        >
          XS
        </button>
        <button
          class="disabled size ${includeSize(
            productsObject[productId].variants.map((el) => el.option1),
            "s"
          )} rounded w-max-[60px] h-[30px] text-mainSize leading-main font-normal"
          value="s" id='${productVariants[productId].id}' data-id='${
          "s-" + productVariants[productId].id
        }'
        >
          S
        </button>
        <button
          class="disabled size ${includeSize(
            productsObject[productId].variants.map((el) => el.option1),
            "m"
          )} rounded w-max-[60px] h-[30px] text-mainSize leading-main font-normal"
          value="m" id='${productVariants[productId].id}' data-id='${
          "m-" + productVariants[productId].id
        }'
        >
          M
        </button>
        <button
          class="disabled size ${includeSize(
            productsObject[productId].variants.map((el) => el.option1),
            "l"
          )} rounded w-max-[60px] h-[30px] text-mainSize leading-main font-normal"
          value="l" id='${productVariants[productId].id}' data-id='${
          "l-" + productVariants[productId].id
        }'
        >
          L
        </button>
        <button
          class="disabled size ${includeSize(
            productsObject[productId].variants.map((el) => el.option1),
            "xl"
          )} rounded w-max-[60px] h-[30px] text-mainSize leading-main font-normal"
          value="xl" id='${productVariants[productId].id}' data-id='${
          "xl-" + productVariants[productId].id
        }'
        >
          XL
        </button>
      </div>
      <div class="buttonColor grid grid-cols-3 gap-2.5" id="buttonColor">
        <button
          class="activeColor color ${includeColor(
            productsObject[productId].variants.map((el) => el.option2),
            "red"
          )} rounded w-max-[60px] h-[30px]  text-mainSize leading-main font-normal "
          value="red" id='${productVariants[productId].id}' data-id='${
          "red-" + productVariants[productId].id
        }'
        >
          Red
        </button>
        <button
          class="disabled color ${includeColor(
            productsObject[productId].variants.map((el) => el.option2),
            "blue"
          )} rounded w-max-[60px] h-[30px]  text-mainSize leading-main font-normal "
          value="blue" id='${productVariants[productId].id}' data-id='${
          "blue-" + productVariants[productId].id
        }'
        >
          Blue
        </button>
      </div>
    </div>
    <h3 class="productPrice"></h3>
    </div>`)
    );

    // Price: ${Object.keys(productVariants[productId].variants)
    //   .filter(
    //     (elem) =>
    //       productVariants[productId].variants[elem].color ===
    //         getProductColor(productVariants[productId].id) &&
    //       productVariants[productId].variants[elem].size === "xs"
    //   )
    //   .map((el) => productVariants[productId].variants[el].price)}

    // function getPrice(id) {
    //   let productValue;
    //   const activeButtons = document.querySelectorAll(".activeColor");
    //   const activeButtonsArr = Array.prototype.slice.call(activeButtons);
    //   activeButtonsArr
    //     .filter((el) => el.id === id)
    //     .map((el) => (productValue = el.value));

    //   console.log(productValue);
    // }

    // getPrice("8037746802969");

    Object.keys(productVariants).map((productID) => {
      const buttonColor = document.querySelectorAll(".buttonColor");
      const buttonSize = document.querySelectorAll(".buttonSize");
      const colorButtons = document.querySelectorAll(".color");
      const sizeButtons = document.querySelectorAll(".size");

      buttonColor.forEach((elem) => {
        elem.addEventListener("click", (event) => {
          const targetId = event.target.dataset.id;
          switch (targetId) {
            case `${"red-" + productVariants[productID].id}`:
              getItems(
                colorButtons,
                `${"red-" + productVariants[productID].id}`,
                productVariants[productID].id
              );
              break;
            case `${"blue-" + productVariants[productID].id}`:
              getItems(
                colorButtons,
                `${"blue-" + productVariants[productID].id}`,
                productVariants[productID].id
              );
              break;
          }
        });
      });

      buttonSize.forEach((elem) => {
        elem.addEventListener("click", (event) => {
          const targetId = event.target.dataset.id;
          switch (targetId) {
            case `${"xs-" + productVariants[productID].id}`:
              getItems(
                sizeButtons,
                `${"xs-" + productVariants[productID].id}`,
                productVariants[productID].id
              );
              break;
            case `${"s-" + productVariants[productID].id}`:
              getItems(
                sizeButtons,
                `${"s-" + productVariants[productID].id}`,
                productVariants[productID].id
              );
              break;
            case `${"m-" + productVariants[productID].id}`:
              getItems(
                sizeButtons,
                `${"m-" + productVariants[productID].id}`,
                productVariants[productID].id
              );
              break;
            case `${"l-" + productVariants[productID].id}`:
              getItems(
                sizeButtons,
                `${"l-" + productVariants[productID].id}`,
                productVariants[productID].id
              );
              break;
            case `${"xl-" + productVariants[productID].id}`:
              getItems(
                sizeButtons,
                `${"xl-" + productVariants[productID].id}`,
                productVariants[productID].id
              );
              break;
          }
        });
      });

      function getItems(buttonsType, productDataId, productVariantId) {
        buttonsType.forEach((item) => {
          if (
            !item.classList.contains("active") &&
            item.dataset.id === productDataId &&
            !item.classList.contains("notAvailable")
          ) {
            item.classList.remove("disabled");
            item.classList.add("activeSize");
          } else if (
            item.id === `${productVariantId}` &&
            !item.classList.contains("notAvailable")
          ) {
            item.classList.remove("activeSize");
            item.classList.add("disabled");
          }
        });
      }

      const desiredCard = document.getElementById(
        `${"card-" + productVariants[productID].id}`
      );
      const activeColorButton = desiredCard.querySelector(".activeColor");
      const activeSizeButton = desiredCard.querySelector(".activeSize");
      const productPrice = desiredCard.querySelector(".productPrice");

      Object.keys(productVariants[productID].variants).map((el) => {
        if (
          productVariants[productID].variants[el].color ===
            activeColorButton.value &&
          productVariants[productID].variants[el].size ===
            activeSizeButton.value
        ) {
          productPrice.innerHTML += `${productVariants[productID].variants[el].price}`;
        } else {
          productPrice.innerHTML += `-`;
        }
      });
    });

    const notAvailable = document.querySelectorAll(".notAvailable");
    notAvailable.forEach((elem) => {
      if (elem.classList.contains("color")) {
        elem.addEventListener("click", () => {
          alert("Товару у вибраному кольорі немає у наявності");
        });
      } else {
        elem.addEventListener("click", () => {
          alert("Товару у вибраному розмірі немає у наявності");
        });
      }
    });
  });

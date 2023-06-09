import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

axios
  .get("https://voodoo-sandbox.myshopify.com/products.json?limit=12")
  .then((response) => {
    const result = response.data;
    const productsCard = document.getElementById("productsCard");
    const productsArray = result.products;

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
            weight: product.grams,
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

    Object.keys(productVariants).map((productId) => {
      productsCard.innerHTML += `<div class="card flex flex-col gap-3" id=${
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
      <div class="product-info flex flex-col gap-3">
        <div class="text-bigSize font-bold leading-main h-9">
          <h3>${productVariants[productId].title}</h3>
          
        </div>
        <hr>
        <div class="font-bold text-mainSize leading-main">
          <h3 class="weight"></h3>
        </div>
      </div>
      <button class="bg-black text-white text-mainSize font-bold leading-main rounded w-full py-4">
        PICK-UP IN <span class="underline decoration-white">2200</span>
      </button>
      <div class="buttonsBlock flex flex-col gap-y-6 pt-4">
      <div class="buttonSize grid grid-cols-3 gap-2.5" id="buttonSize">
      <div class="flex items-center bigSize leading-main font-bold">
      <h3>Sizes:</h3>
      </div>
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
      <div class="flex items-center text-bigSize leading-main font-bold">
      <h3>Colors:</h3>
      </div>
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
    <div class="border-double border-4 border-black bg-white rounded-3xl text-center max-w-fit py-2 px-8 self-center mt-3">
    <h3 class="productPrice text-bigSize leading-main font-bold "></h3>
    </div>
    </div>`;
    });

    Object.keys(productVariants).map((productID) => {
      const desiredCard = document.getElementById(
        `${"card-" + productVariants[productID].id}`
      );
      const colorButtonsInCard = desiredCard.querySelectorAll(".color");
      const sizeButtonsInCard = desiredCard.querySelectorAll(".size");
      const productPrice = desiredCard.querySelector(".productPrice");
      const productWeight = desiredCard.querySelector(".weight");

      function updateProductPriceAndWeight() {
        const activeColorButton = desiredCard.querySelector(".activeColor");
        const activeSizeButton = desiredCard.querySelector(".activeSize");

        const selectedVariant = Object.values(
          productVariants[productID].variants
        ).find(
          (variant) =>
            variant.color === activeColorButton.value &&
            variant.size === activeSizeButton.value
        );

        if (selectedVariant) {
          productPrice.textContent = `${
            "Price: " + Math.trunc(selectedVariant.price) + "$"
          }`;
          productWeight.textContent = `${
            "Weight: " + selectedVariant.weight / 1000 + "kg"
          }`;
        } else {
          productPrice.textContent = "Not available";
          productWeight.textContent = "Weight: -";
        }
      }

      colorButtonsInCard.forEach((button) => {
        button.addEventListener("click", () => {
          colorButtonsInCard.forEach((btn) => {
            btn.classList.remove("activeColor"), btn.classList.add("disabled");
          });
          button.classList.add("activeColor");
          button.classList.remove("disabled");
          updateProductPriceAndWeight();
        });
      });

      sizeButtonsInCard.forEach((button) => {
        button.addEventListener("click", () => {
          sizeButtonsInCard.forEach((btn) => {
            btn.classList.remove("activeSize"), btn.classList.add("disabled");
          });
          button.classList.add("activeSize");
          button.classList.remove("disabled");
          updateProductPriceAndWeight();
        });
      });

      updateProductPriceAndWeight();
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

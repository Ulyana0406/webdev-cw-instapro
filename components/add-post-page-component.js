import { goToPage } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";


  const render = () => {
    const appHtml = `
    <div class="page-container">
    <div class="header-container"></div>
    <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container">
          <label class="file-upload-label secondary-button">
          <input type="file" class="file-upload-input" style="display:none">
              Выберите фото
          </label>
          </div>
          <input type="text" id="description-input" class="input" placeholder="Описание картинки" />
          <div class="form-error"></div>      
            <button class="button" id="add-post-button">Добавить</button>
            
        </div>
    </div>
  </div>    `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    for (let userEl of document.querySelectorAll(".post-header")) {
      userEl.addEventListener("click", () => {
        goToPage(USER_POSTS_PAGE, {
          userId: userEl.dataset.userId,
        });
      });
    }

    const uploadImageContainer = document.querySelector(
      ".upload-image-container"
    );

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-post-button").addEventListener("click", () => {
      const descriptionInput = document.getElementById("description-input").value;

      onAddPostClick({
        description: descriptionInput,
        imageUrl: imageUrl,
      });
    });
  };

  render();
}
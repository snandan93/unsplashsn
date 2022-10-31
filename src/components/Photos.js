import React from "react";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import Masonry from "react-masonry-css";

const lightboxOptions = {
  settings: {
    disableKeyboardControls: true,
    disableWheelControls: true
  },
  buttons: {
    showAutoplayButton: false,
    showDownloadButton: true,
    showFullscreenButton: false,
    showThumbnailsButton: false,
    showNextButton: false,
    showPrevButton: false
  },
  thumbnails: {
    showThumbnails: false
  }
};

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1
};

const Photos = ({ photos }) => {
  const gallery =
    photos &&
    !!photos.length &&
    photos.map((photo, index) => {
      return (
        <div key={index} className="gallery__item">
          <img src={photo.urls.regular} alt={"Author: " + photo.user.name} />
          <div className="item-details">
            <div className="details-likes">
              <p>
                <span role="img" aria-label="heart emoji">
                  ❤️
                </span>{" "}
                {photo.likes}
              </p>
            </div>
            <div className="details-profile">
              <a
                href={photo.user.links.html}
                className="details-profile__image"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={photo.user.profile_image.small}
                  alt={photo.user.username}
                />
                <span className="details-profile__username">
                  {photo.user.name}
                </span>
              </a>
              <a
                href={photo.links.download + "?force=true"}
                className="details-profile__button"
                target="_self"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      );
    });

  let content = gallery.length && gallery;

  return (
    <SimpleReactLightbox>
      <SRLWrapper options={lightboxOptions}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="gallery__row"
          columnClassName="gallery__column"
        >
          {content}
        </Masonry>
      </SRLWrapper>
    </SimpleReactLightbox>
  );
};

export default Photos;

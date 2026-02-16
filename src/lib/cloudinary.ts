import { CLOUDINARY_CLOUD_NAME } from "@/constants";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { format, quality, dpr } from "@cloudinary/url-gen/actions/delivery";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { Position } from "@cloudinary/url-gen/qualifiers";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUDINARY_CLOUD_NAME,
  },
});

export const bannerPhoto = (imageCldPubId: string, name: string) => {
  return cld
    .image(imageCldPubId)
    .resize(fill().width(200).height(300))
    .delivery(format("auto"))
    .delivery(quality("auto"))
    .delivery(dpr("auto"))
    .overlay(
      source(
        text(name, new TextStyle("roboto", 40).fontWeight("bold")).textColor(
          "white",
        ),
      ).position(
        new Position()
          .gravity(compass("south_west"))
          .offsetY(0.2)
          .offsetX(0.02),
      ),
    );
};

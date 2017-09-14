class Image < ApplicationRecord
  mount_uploader :attachment, ImageUploader

  def build_for_gallery
    {
      id: id,
      src: attachment.url(:large),
      thumbnail: attachment.url(:thumbnail),
      thumbnailWidth: dimensions['thumbnail']['width'],
      thumbnailHeight: dimensions['thumbnail']['height'],
      caption: attachment.file.filename,
      isSelected: false,
      editPath: Rails.application.routes.url_helpers.edit_admin_image_path(id)
    }
  end
end

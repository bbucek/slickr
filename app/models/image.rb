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
      editPath: admin_edit_path
    }
  end

  def admin_edit_path
    Rails.application.routes.url_helpers.edit_admin_image_path(id)
  end

  def admin_update_path
    Rails.application.routes.url_helpers.admin_image_path(id)
  end

  def timestamped_image_url
    "#{attachment.url}?timestamp=#{DateTime.now.to_s}"
  end

  def crop(x, y, w, h)
    return if (x || y || w || h) == nil
    image =  Magick::ImageList.new(attachment.current_path)
    cropped_image = image.crop(x, y, w, h)
    cropped_image.write(attachment.current_path)
    attachment.recreate_versions!
  end
end
json.array!(@images) do |image|
  json.id image.id
  json.src image.attachment.url(:large)
  json.thumbnail image.attachment.url(:thumbnail)
  json.thumbnailWidth image.dimensions['thumbnail']['width']
  json.thumbnailHeight image.dimensions['thumbnail']['height']
  json.caption image.attachment.file.filename
  json.isSelected false
  json.editPath edit_admin_image_path(image.id)
end

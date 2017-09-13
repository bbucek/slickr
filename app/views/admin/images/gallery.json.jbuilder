json.array!(@images) do |image|
  json.id image.id
  json.src image.attachment.url
  json.thumbnail image.attachment.url
  json.thumbnailWidth 240
  json.thumbnailHeight 320
  json.caption image.attachment.file.filename
  json.isSelected false
end

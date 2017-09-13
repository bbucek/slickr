ActiveAdmin.register Image do
  
config.filters = false
config.batch_actions = false

permit_params :attachment

# permit_params :attachment
# index as: :grid do |image|
#   link_to image_tag(image.attachment_url), admin_image_path(image)
# end

index download_links: false do
  render 'gallery'
end

form :partial => "form"

# form do |f|
#   f.inputs do
#     f.input :attachment, as: :file
#   end
#   f.actions
# end
end

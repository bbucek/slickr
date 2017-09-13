ActiveAdmin.register Image do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
config.filters = false
config.batch_actions = false

# permit_params :attachment
# index as: :grid do |image|
#   link_to image_tag(image.attachment_url), admin_image_path(image)
# end

index download_links: false do
  render 'gallery'
end
# index :partial => 'gallery'
form :partial => "form"
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

end

ActiveAdmin.register Author do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end
  permit_params :name
  menu priority: 3

  filter :name
  config.clear_action_items!

  show do
    render 'show'
    active_admin_comments
  end

  action_item :edit_author, only: :show do
    link_to edit_admin_author_path(resource) do
      raw("<svg class='svg-icon'><use xlink:href='#svg-edit' /></svg>Edit")
    end
  end

  action_item :new_author, only: :index do
    link_to new_admin_author_path do
      raw("<svg class='svg-icon'><use xlink:href='#svg-plus' /></svg>Add author")
    end
  end

end

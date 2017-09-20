ActiveAdmin.register Book do
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
  permit_params :title, :author_id
  menu priority: 4
  filter :title

  config.clear_action_items!

  index do
    selectable_column
    column :author
    column :title
    column :isbn
    column :publisher
    column :publishing_year
    actions
  end

  show do
    render 'show'
    active_admin_comments
  end

  action_item :new_book, only: :index do
    link_to new_admin_book_path do
      raw("<svg class='svg-icon'><use xlink:href='#svg-plus' /></svg>Add book")
    end
  end

end
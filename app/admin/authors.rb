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
  permit_params :name, :image, :email, :local_authority, :ll_funded, :bio
  menu priority: 3

  filter :name
  config.clear_action_items!

  index do
    selectable_column
    column :name
    column :email
    column :languages
    column :local_authority
    actions
  end

  form do |f|
    f.inputs 'Author photo' do
      if resource.image.url.present?
        div class: 'author_image' do
          image_tag resource.image
        end
      end
      f.input :image, as: :file_modified, label: 'Select author photo'
    end
    f.inputs class:'form_inputs' do
      f.input :name
      f.input :email
      f.input :local_authority
      f.input :ll_funded
      f.input :bio
    end
    f.actions

  end

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

  controller do
    def index
      if params[:type] == 'megadraft_authors'
        @authors = Author.all
        index! do |format|
          format.html { render :json => @authors.to_json }
        end
      else
        index!
      end
    end

    def create
      super do |format|
        EventLog.create(action: :create, eventable: resource, admin_user: current_admin_user) if resource.valid?
        redirect_to resource_url and return if resource.valid?
      end
    end

    def update
      super do |format|
        EventLog.create(action: :update, eventable: resource, admin_user: current_admin_user) if resource.valid?
        redirect_to resource_url and return if resource.valid?
      end
    end
  end

end

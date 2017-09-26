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
  permit_params :title, :author_id, :isbn, :publisher, :publishing_year, :image
  menu priority: 4
  filter :title

  config.clear_action_items!

  form do |f|
    f.inputs 'Book cover' do
      div class: 'book_cover' do
        image_tag resource.image
      end
      f.input :image, as: :file_modified, label: 'Select book cover image'
    end
    f.inputs class:'form_inputs' do
      f.input :title
      f.input :author
      f.input :publisher
      f.input :publishing_year
      f.input :isbn
    end
    f.actions

  end


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

  controller do
    def index
      if params[:type] == 'megadraft_books'
        @books = Book.all
        index! do |format|
          format.html { render :json => @books.to_json }
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
      end
    end
  end

end

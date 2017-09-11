ActiveAdmin.register Page do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
  config.per_page = 10

  config.filters = false
  decorate_with PageDecorator
  before_action :set_paper_trail_whodunnit
  permit_params :title, :intro, :layout, content_areas: [:content]
  form :partial => "edit"
  controller do
    def find_resource
      scoped_collection.friendly.find(params[:id])
    end
  end

  member_action :publish, method: :put do
    resource.publish!
    respond_to do |format|
      format.html { redirect_to edit_resource_path, notice: "Published" }
      format.json { render json: @page.as_json }
    end
  end

  member_action :unpublish, method: :put do
    resource.unpublish!
    respond_to do |format|
      format.html { redirect_to edit_resource_path, notice: "Unpublished" }
      format.json { render json: @page.as_json }
    end
  end

  member_action :create_draft, method: :post do
    resource.create_draft
    redirect_to edit_resource_path
  end

  member_action :delete_draft, method: :delete do
    resource.create_draft
    redirect_to edit_resource_path
  end

  controller do
    def update
      update! do |format|
        format.html { redirect_to edit_admin_page_path(resource) }
        format.json { render json: @page.as_json(methods: [:admin_page_path]) }
      end
    end

    def edit
      super do |format|
        resource.build_content_area if resource.content_areas.empty?
      end
    end

    def user_for_paper_trail
      current_admin_user ? current_admin_user.id : 'Public user'  # or whatever
    end

    def info_for_paper_trail
      { admin_id: current_admin_user.id }
    end
  end
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

end

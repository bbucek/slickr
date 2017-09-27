require 'draftjs_exporter/entities/link'

ActiveAdmin.register Page do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
  menu priority: 2, label: 'Pages'

  config.filters = false
  config.batch_actions = false
  decorate_with PageDecorator
  before_action :set_paper_trail_whodunnit
  permit_params :meta_title, :meta_description, :title, :page_intro, :layout, :parent_id, content: {}
  form :partial => "edit"
  config.clear_action_items!

  action_item :new_page, only: :index do
    link_to new_admin_page_path do
      raw("<svg class='svg-icon'><use xlink:href='#svg-plus' /></svg>Add page")
    end
  end

  action_item :preview_page, only: :edit do
    link_to preview_admin_page_path(resource), target: "_blank" do
      raw("<svg class='svg-icon'><use xlink:href='#svg-preview' /></svg>Preview")
    end
  end

  index title: 'Site map', download_links: false do |page|
    render partial: 'dashboard'
  end


  controller do
    def find_resource
      scoped_collection.friendly.find(params[:id])
    end
    def create
      super do |format|
        EventLog.create(action: :create, eventable: resource, admin_user: current_admin_user) if resource.valid?
        redirect_to edit_resource_url and return if resource.valid?
      end
    end

    def update
      super do |format|
        EventLog.create(action: :update, eventable: resource, admin_user: current_admin_user) if resource.valid?
        redirect_to edit_resource_url and return if resource.valid?
      end
    end
  end


  member_action :publish, method: :put do
    resource.publish! and EventLog.create(action: :publish, eventable: resource, admin_user: current_admin_user) if resource.valid?
    respond_to do |format|
      format.html { redirect_to edit_resource_path, notice: "Published" }
      format.json { render json: @page.as_json }
    end
  end

  member_action :unpublish, method: :put do
    resource.unpublish! and EventLog.create(action: :unpublish, eventable: resource, admin_user: current_admin_user) if resource.valid?
    respond_to do |format|
      format.html { redirect_to edit_resource_path, notice: "Unpublished" }
      format.json { render json: @page.as_json }
    end
  end

  member_action :create_draft, method: :post do
    draft = resource.create_draft
    EventLog.create(action: :create, eventable: draft, admin_user: current_admin_user) if draft.valid?
    redirect_to edit_resource_path
  end

  member_action :delete_draft, method: :delete do
    resource.delete_draft(draft_id)
    EventLog.create(action: :delete, eventable: draft, admin_user: current_admin_user) if draft.valid?
    redirect_to edit_resource_path
  end

  member_action :preview, method: :get do
    # exporter = DraftjsExporter::HTML.new(Page::DRAFTJS_CONFIG)
    content = resource.restructure_content

    html_output = exporter.call(resource.content.deep_symbolize_keys)
    render layout: false, template: 'layouts/page_layouts/landing', locals: {page: resource, content: html_output}
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
        # resource.build_content_area if resource.content_areas.empty?
      end
    end


    def user_for_paper_trail
      current_admin_user ? current_admin_user.id : 'Public user'  # or whatever
    end

    def info_for_paper_trail
      { admin_id: current_admin_user.id } if current_admin_user
    end
  end

end

ActiveAdmin.register Image do
  actions :all, :except => [:new]
  config.filters = false
  config.batch_actions = false

  permit_params :attachment, :crop_data, data: {}

  index download_links: false do
    render 'gallery'
  end

  form :partial => "form"

  controller do
    def create
      create! do |format|
        format.html { redirect_to admin_images_path }
        format.json { render :json => @image.to_json(
          methods: [:build_for_gallery, :admin_edit_path, :admin_update_path]
        )}
      end
    end

    def update

      @image = Image.find(params[:image][:id])
      @image.crop(params[:image][:crop_data][:x],params[:image][:crop_data][:y],params[:image][:crop_data][:width],params[:image][:crop_data][:height])
      # @image.save
      # attachment = File.new(@image.attachment.current_path)
      # new_image = Image.new(attachment: attachment, data: @image.data)
      # new_image.save
      # @image = new_image

      update! do |format|
        format.html { redirect_to edit_admin_image_path(resource) }
        format.json { render json: @image.to_json(methods: [:admin_update_path]) }
      end
    end
  end
end

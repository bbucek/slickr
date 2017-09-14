require 'open-uri'

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

  controller do
    def create
      @image = Image.new(attachment: params[:image][:attachment][0])
      if @image.save
        respond_to do |format|
          format.json { render :json => @image.build_for_gallery }
        end
      end
    end
  end
end

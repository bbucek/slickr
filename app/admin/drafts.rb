require 'draftjs_exporter/entities/link'
ActiveAdmin.register Page::Draft, as: 'Draft' do
  belongs_to :page
  form do |f|
    f.inputs do
      f.input :content, as: :text
    end
    f.actions
  end
end


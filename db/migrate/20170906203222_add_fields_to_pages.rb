class AddFieldsToPages < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :page_header, :text
    add_column :pages, :page_intro, :text
    add_column :pages, :layout, :string
    add_column :pages, :meta_title, :string
    add_column :pages, :meta_description, :text
    add_column :pages, :og_title, :text
    add_column :pages, :og_title_2, :text
    add_column :pages, :og_description, :text
    add_column :pages, :og_description_2, :text
    add_column :pages, :og_image, :text
    add_column :pages, :og_image_2, :text
  end
end

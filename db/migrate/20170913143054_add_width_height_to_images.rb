class AddWidthHeightToImages < ActiveRecord::Migration[5.1]
  def change
    add_column :images, :dimensions, :jsonb
  end
end

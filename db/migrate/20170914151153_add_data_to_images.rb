class AddDataToImages < ActiveRecord::Migration[5.1]
  def change
    add_column :images, :data, :jsonb, default: {"alt_text": ""}
  end
end

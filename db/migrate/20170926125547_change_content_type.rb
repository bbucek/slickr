class ChangeContentType < ActiveRecord::Migration[5.1]
  def change
    change_column :pages, :content, :jsonb, default: {}
  end
end

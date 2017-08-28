class AddDraftsStiToPages < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :type, :string
    add_column :pages, :page_id, :integer
  end
end

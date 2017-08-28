class AddActiveDraftIdToPages < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :active_draft_id, :integer
  end
end

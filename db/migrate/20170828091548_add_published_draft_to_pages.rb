class AddPublishedDraftToPages < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :published_draft_id, :integer
  end
end

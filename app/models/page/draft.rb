class Page::Draft < Page

  belongs_to :page

  skip_callback :create, :after, :create_draft
  skip_callback :create, :after, :activate_draft

  def activate
    page.update_attribute(:active_draft_id, self.id)
  end

end

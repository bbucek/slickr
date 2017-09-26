class Page < ApplicationRecord

  extend FriendlyId
  include AASM
  has_ancestry
  has_paper_trail only: [:title, :aasm_state, :content, :published_content, :drafts],
                  meta: { content_changed: :content_changed? }
  Layouts = ["standard", "contact", "landing"]
  friendly_id :title, use: [:slugged, :finders]
  has_many :drafts, dependent: :destroy
  has_one :active_draft, class_name: "Page::Draft"
  has_one :published_draft, class_name: "Page::Draft"
  after_initialize :create_content_areas
  after_create :create_draft, :activate_draft
  scope :not_draft, -> {where(type: nil)}

  aasm(:status, column: :aasm_state) do
    state :draft, initial: true
    state :published

    event :publish do
      transitions from: :draft, to: :published
    end

    event :unpublish do
      transitions from: :published, to: :draft
    end
  end

  def expanded
    root?
  end

  def self.root_subtree_for_views
    Page.sort_by_ancestry(Page.subtree_of(Page.roots.first)).map{|p| Array({"#{Array.new(p.depth, '-').join('')}#{p.title}".to_sym => p.id}).flatten }
  end

  def published
    published?
  end

  def tree_children
    children.decorate.map do |p|
      { id: p.id,
        title: p.title,
        add_child_path: p.add_child_path,
        edit_page_path: p.edit_page_path,
        published: p.published?,
        subtitle: p.subtitle,
        children: p.tree_children
      }
    end
  end

  def create_content_areas
    content = []
  end

  def create_draft
    drafts.create
  end

  def activate_draft
    drafts.first.activate
  end

  def add_child_path
    Rails.application.routes.url_helpers.new_admin_page_path(parent: self.id)
  end

  def admin_unpublish_path
    Rails.application.routes.url_helpers.unpublish_admin_page_path(self.id)
  end

  def admin_publish_path
    Rails.application.routes.url_helpers.publish_admin_page_path(self.id)
  end

  def edit_page_path
    Rails.application.routes.url_helpers.edit_admin_page_path(self.id)
  end

  def admin_page_path
    Rails.application.routes.url_helpers.admin_page_path(self.id)
  end

  def admin_image_index_path
    Rails.application.routes.url_helpers.admin_images_path
  end

  # def content_areas
  #   JSON.parse(read_attribute(:content)).map {|v| ContentArea.new(v) }
  # end

  # def content_areas=(attributes)
  #   content_areas = []
  #   attributes.each do |attrs|
  #     next if '1' == attrs.delete("_destroy")
  #     attrs[:position] = attrs[:position].try(:to_i)
  #     content_areas << attrs
  #   end
  #   write_attribute(:content, content_areas.to_json)
  # end
  #
  # def build_content_area
  #   v = JSON.parse(self.content.dup)
  #   v << ContentArea.new({name: '', content: '', position: v.length + 1})
  #   self.content = v.to_json
  # end
  #
  # class ContentArea
  #   attr_accessor :name, :content, :position
  #
  #   def initialize(hash)
  #     @name          = hash['name']
  #     @content      = hash['content']
  #     @position      = hash['position'].to_i
  #   end
  #
  #   def persisted?() false; end
  #   def new_record?() false; end
  #   def marked_for_destruction?() false; end
  #   def _destroy() false; end
  #
  # end

end

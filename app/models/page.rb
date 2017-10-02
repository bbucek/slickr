class Page < ApplicationRecord

  extend ActsAsTree::TreeWalker
  acts_as_tree order: "position"
  acts_as_list scope: :parent_id
  extend FriendlyId
  include AASM
  has_paper_trail only: [:title, :aasm_state, :content, :published_content, :drafts],
                  meta: { content_changed: :content_changed? }
  Layouts = ["standard", "contact", "landing"]
  DRAFTJS_CONFIG = {
    entity_decorators: {
      'LINK' => DraftjsExporter::Entities::Link.new(className: 'link'),
      'BOOK_LINK' => DraftjsExporter::Entities::Link.new(className: 'book__link'),
      'AUTHOR_LINK' => DraftjsExporter::Entities::Link.new(className: 'author__link'),
      'IMAGE' => ImageEntity.new,
      'VIDEO' => VideoEntity.new
    },
    block_map: {
      'header-one'          => { element: 'h1' },
      'header-two'          => { element: "h2" },
      'header-three'        => { element: "h3" },
      'header-four'         => { element: "h4" },
      'unordered-list-item' => {
        element: 'li',
        wrapper: ['ul', { className: 'public-DraftStyleDefault-ul' }]
      },
      'ordered-list-item'   => {
        element: 'li',
        wrapper: ['ol', { className: 'public-DraftStyleDefault-ol' }]
      },
      "blockquote"          => { element: "blockquote" },
      "code-block"          => { element: "pre" },
      'unstyled'            => { element: 'p' },
      'atomic'              => { element: 'div' }
    },
    style_map: {
      'UNDERLINE'           => { fontStyle: 'underline' },
      'ITALIC'              => { fontStyle: 'italic' },
      'BOLD'                => { fontStyle: 'bold' }
    }
  }
  friendly_id :title, use: [:slugged, :finders]
  has_many :drafts, dependent: :destroy
  has_one :active_draft, class_name: "Page::Draft"
  has_one :published_draft, class_name: "Page::Draft"
  before_create :create_content_areas
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

  def display_title
    title
  end

  def self.root_subtree_for_views
  end

  def published
    published?
  end

  def tree_children
    children.not_draft.decorate.map do |p|
      { id: p.id,
        title: p.title,
        add_child_path: p.add_child_path,
        edit_page_path: p.edit_page_path,
        change_position_admin_page: p.change_position_admin_page,
        published: p.published?,
        subtitle: p.subtitle,
        children: p.tree_children,
        position: p.position
      }
    end
  end

  def create_content_areas
    self.content = {
      "entityMap": {},
      "blocks": [
        {
          "key": SecureRandom.hex(3),
          "text": "",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        }
      ]
    };
  end

  def restructure_content
    atomic_blocks = []
    content["blocks"].each_with_index { |block, index| atomic_blocks << {block: block, index: index} if block['type'] == 'atomic' }

    atomic_blocks.each do |atomic_block|
      entity_key = SecureRandom.hex(3)

      content["entityMap"][entity_key] = {
        data: atomic_block[:block]["data"],
        type: atomic_block[:block]["data"]["type"].upcase,
        mutability: "IMMUTABLE"
      }

      replacement_block = {
        "key" => atomic_block[:block]["key"],
        "data" => {},
        "text" => " ",
        "type" => "atomic",
        "depth" => 0,
        "entityRanges" => [
          {
            "key" => entity_key,
            "length" => 1,
            "offset" => 0
          }
        ],
        "inlineStyleRanges" => []
      }

      content["blocks"][atomic_block[:index]] = replacement_block



    end
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

  def admin_preview_page_path
    Rails.application.routes.url_helpers.preview_admin_page_path(self.id)
  end

  def change_position_admin_page
    Rails.application.routes.url_helpers.change_position_admin_page_path(self.id)
  end

  def admin_page_path
    Rails.application.routes.url_helpers.admin_page_path(self.id)
  end

  def admin_image_index_path
    Rails.application.routes.url_helpers.admin_images_path
  end

  def admin_book_index_path
    Rails.application.routes.url_helpers.admin_books_path
  end

  def admin_author_index_path
    Rails.application.routes.url_helpers.admin_authors_path
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

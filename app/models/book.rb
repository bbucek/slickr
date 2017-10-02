class Book < ApplicationRecord
  mount_uploader :image, CoverUploader
  belongs_to :author
  validates :isbn, presence: true

  def display_title
    title
  end
end

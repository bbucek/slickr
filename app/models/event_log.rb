class EventLog < ApplicationRecord
  belongs_to :eventable, polymorphic: true
  belongs_to :admin_user
end

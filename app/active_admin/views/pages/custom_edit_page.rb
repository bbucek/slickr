module ActiveAdmin
  module Views
    module Pages
      class CustomEditPage < Base
        private

        def build_page
          within @body do
            div id: "wrapper" do
              build_unsupported_browser
              build_header # <title> tag comes first
              build_page_content
              build_footer
            end
          end
        end
      end
    end
  end
end

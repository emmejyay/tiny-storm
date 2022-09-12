class ApplicationController < ActionController::Base

  def default_url_options
    { host: ENV["www.tinystorm.co"] || "localhost:3000" }
  end
end

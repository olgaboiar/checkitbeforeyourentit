class WelcomeController < ApplicationController
  before_action :get_client

  def index 
  end

  def search
    @response = @client.get("b2iz-pps8", {"$limit" => params[:limit], "$where" => params[:where]})
    respond_to do |format|
      if @response.empty?
        format.js {render :success}
      else
        format.js {render :violations}
      end
    end
  end

  def school
    @school = @client.get("xehh-f7pi", {"$limit" => params[:limit], "$where" => params[:where]})
    respond_to do |format|
      format.js {render :school}
    end
    gon.school_zones = @school
    puts @school
  end

  private
    def get_client
      @client = SODA::Client.new({:domain => "data.cityofnewyork.us", :app_token => ENV['NYC_OPEN_DATA_API_KEY']})
    end
  
end

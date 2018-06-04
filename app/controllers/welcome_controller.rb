class WelcomeController < ApplicationController
  before_action :get_client

  def index 
  end

  def search
    @record = "test"
    @response = @client.get("b2iz-pps8", {"$limit" => params[:limit], "$where" => params[:where]})
    
    respond_to do |format|
      if @response.empty?
        format.js {render :success}
      else
        format.js {render :violations}
        # format.json { render json: @freelancer.errors, status: :unprocessable_entity }
      end
    end


  end

  private
    def get_client
      @client = SODA::Client.new({:domain => "data.cityofnewyork.us", :app_token => ENV['NYC_OPEN_DATA_API_KEY']})
    end
  
end

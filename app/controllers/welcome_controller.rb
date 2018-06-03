class WelcomeController < ApplicationController
  before_action :get_client
  
  def index
    if params[:building]
      
      @passed = params[:building]
      @response = @client.get("b2iz-pps8", {"$limit" => 1, :boroid => 1})
      puts "test"
      puts @response
      @latitude = @response.first.latitude
      @longitude = @response.first.longitude
      puts @latitude
      puts @longitude
      puts "test1"
      @coordinates = Geocoder.coordinates(@passed)
      puts @coordinates
      
    else

    end
    
  end


  private
    def get_client
      @client = SODA::Client.new({:domain => "data.cityofnewyork.us", :app_token => ENV['NYC_OPEN_DATA_API_KEY']})
    end
  
end

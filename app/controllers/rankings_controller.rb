class RankingsController < ApplicationController
  before_action :authorize_request, except: :create
  before_action :set_ranking, only: [:show, :update, :destroy]

  # GET /rankings
  def index
    @rankings = Ranking.all

    render json: @rankings
  end

  # GET /rankings/1
  def show
    render json: @ranking
  end

  # POST /rankings
  def create
    @ranking = Ranking.new(ranking_params)

    if @ranking.save
      render json: @ranking, status: :created, location: @ranking
    else
      render json: @ranking.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /rankings/1
  def update
    if @ranking.update(ranking_params)
      render json: @ranking
    else
      render json: @ranking.errors, status: :unprocessable_entity
    end
  end

  # DELETE /rankings/1
  def destroy
    @ranking.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ranking
      @ranking = Ranking.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def ranking_params
      params.require(:ranking).permit(:data, :date)
    end
end

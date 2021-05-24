class PreviousRankingsController < ApplicationController
  before_action :set_previous_ranking, only: [:show, :update, :destroy]

  # GET /previous_rankings
  def index
    @previous_rankings = PreviousRanking.all

    render json: @previous_rankings
  end

  # GET /previous_rankings/1
  def show
    render json: @previous_ranking
  end

  # POST /previous_rankings
  def create
    @previous_ranking = PreviousRanking.new(previous_ranking_params)

    if @previous_ranking.save
      render json: @previous_ranking, status: :created, location: @previous_ranking
    else
      render json: @previous_ranking.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /previous_rankings/1
  def update
    if @previous_ranking.update(previous_ranking_params)
      render json: @previous_ranking
    else
      render json: @previous_ranking.errors, status: :unprocessable_entity
    end
  end

  # DELETE /previous_rankings/1
  def destroy
    @previous_ranking.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_previous_ranking
      @previous_ranking = PreviousRanking.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def previous_ranking_params
      params.require(:previous_ranking).permit(:data, :date)
    end
end

package com.Hend.BackendSpringboot.DTOs;

public class SurveyDTO {

    private Integer id;
    private String titleSurvey;
    private String descriptionSurvey;
    //private Integer userId;

    public SurveyDTO(Integer id, String titleSurvey, String descriptionSurvey) {
        this.id = id;
        this.titleSurvey = titleSurvey;
        this.descriptionSurvey = descriptionSurvey;
        //this.userId = userId;

    }

    public SurveyDTO() {

    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getTitleSurvey() {
        return titleSurvey;
    }

    public void setTitleSurvey(String titleSurvey) {
        this.titleSurvey = titleSurvey;
    }

    public String getDescriptionSurvey() {
        return descriptionSurvey;
    }

    public void setDescriptionSurvey(String descriptionSurvey) {
        this.descriptionSurvey = descriptionSurvey;
    }

    //public Integer getUserId() {
        //return userId;
    //}

    //public void setUserId(Integer userId) {
        ////this.userId = userId;
    //}

}

import React from "react";

// import "../../resources/css/jquery-ui-themes.css";
// import "../../resources/css/axure_rp_page.css";
// import "../../resources/data/styles.css";
// import "../../resources/files/styles.css";
import { $ } from "jquery";
import "jquery-ui";
import UserNavBar from "../../components/common/UserNavBar";
import {MY_COOKBOOK} from "../../UIRoutes";


const samplerecipes = {

    1: {name : 'Pasta', Ingredients:'Test1', Directions:'Test2'},
    2: {name : 'Arnolds Eggs', Ingredients:'Test3', Directions:'Test4'},
    3: {name : 'Steak', Ingredients:'Test5', Directions:'Test6'},
    4: {name : 'Eggs', Ingredients:'Test7', Directions:'Test8'},
    5: {name : 'Rice', Ingredients:'Test9', Directions:'Test10'}

};

class RecipeBuilder extends React.Component {

    render() {

        const question = this.props.details;
        //alert(this.props.thang);


        return (
            <div>

                <button class="collapsible"> {question.name}</button>
                <div class = "content">
                    <div class="RecipePage">
                        <ul class="RecipleInfo">
                            <li>
                                Level: *****
                            </li>
                            <li>
                                Rating: *****
                            </li>
                        </ul>

                        <ul class="RecipleInfo">
                            <li>
                                Cook Time:
                            </li>
                            <li>
                                Prep Time:
                            </li>
                        </ul>
                        <ul class="RecipleInfo">
                            <li>
                                Total Time:
                            </li>
                            <li>
                                Servings:
                            </li>
                        </ul>

                    </div>
                    <div class="recipe-body">
                        <div  class="bodyLeft">
                            <p>Ingredients </p>
                            <div>{question.Ingredients}</div>
                            <ul class="RecipleInfo">
                                <li>
                                    Cook Time:
                                </li>
                                <li>
                                    Prep Time:
                                </li>
                            </ul>
                        </div>
                        <div  class="bodyRight">
                            <p>Directions </p>
                            <div>{question.Directions}</div>
                            <ul class="RecipleInfo">
                                <li>
                                    Cook Time:
                                </li>
                                <li>
                                    Prep Time:
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class RecipePage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.state = {text2: 'ff'};
        this.state = {recipes: samplerecipes};

        this.renderRecipe = this.renderRecipe.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
    }

    componentDidMount () {

        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
    }

    renderRecipe(key) { //Thang updates automatically!!
        return <RecipeBuilder key={key} index={key} details={this.state.recipes[key]} thang={this.state.value} />
    }
    handleChange(event) {

        this.setState({value: event.target.value});

    }

    handleSubmit2(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
        this.setState({text2: this.state.value});

    }





    render() {

        return <div id="base" ref={mycookbook => this.mycookbook = mycookbook} class="">

            <UserNavBar pageName={"My Cookbook"} currentPath={MY_COOKBOOK}/>

            <div id="u407" className="ax_default box_3">
                <div id="u407_div" class=""></div>
            </div>


            <div id="u408" class="ax_default heading_1">
                <div id="u408_div" class=""></div>
                <div id="u408_text" class="text ">
                    <p><span>{this.state.text}</span></p>
                </div>
            </div>


            <div id="u409" class="ax_default image">
                <img id="u409_img" class="img " src="images/_account_info/u2.svg"/>
            </div>


            <div id="u410" class="ax_default heading_3">
                <div id="u410_div" class=""></div>
                <div id="u410_text" class="text ">
                    <p><span>Username</span></p>
                </div>
            </div>


            <div id="u411" class="ax_default heading_3">
                <div id="u411_div" class=""></div>
                <div id="u411_text" class="text ">
                    <p><span>MyCookbook</span></p>
                </div>
            </div>


            <div id="u412" class="ax_default heading_3">
                <div id="u412_div" class=""></div>
                <div id="u412_text" class="text ">
                    <p><span>MyMealplans</span></p>
                </div>
            </div>


            <div id="u413" class="ax_default heading_3">
                <div id="u413_div" class=""></div>
                <div id="u413_text" class="text ">
                    <p><span>PublicRecipes</span></p>
                </div>
            </div>


            <div id="u414" class="ax_default box_3">
                <div id="u414_div" class=""></div>
            </div>


            <div id="u415" class="ax_default box_3">
                <div id="u415_div" class=""></div>
                <div id="u415_text" class="text ">
                    <p><span>Search Filters</span></p>
                </div>
            </div>


            <div id="u416" class="ax_default box_3">
                <div id="u416_div" class=""></div>
            </div>


            <div id="u417" class="ax_default box_3">
                <div id="u417_div" class=""></div>
            </div>


            <div id="u418" class="ax_default heading_2">
                <div id="u418_div" class=""></div>
                <div id="u418_text" class="text ">
                    <p><span>MyCookBook</span></p>
                </div>
            </div>


            <div id="u419" class="ax_default heading_3">
                <div id="u419_div" class=""></div>
                <div id="u419_text" class="text ">
                    <p><span>Search</span></p>
                </div>
            </div>


            <div id="u420" class="ax_default text_field">
                <input id="u420_input" type="text" value=""/>
            </div>


            <div id="u421" class="ax_default primary_button">
                <div id="u421_div" class=""></div>
                <div id="u421_text" class="text ">
                    <p><span>+ Filter</span></p>
                </div>
            </div>


            <div id="u422" class="ax_default box_3">
                <div id="u422_div" class=""></div>
            </div>


            <div id="u423" class="ax_default text_area">
                <textarea id="u423_input"></textarea>
            </div>


            <div id="u424" class="ax_default primary_button">
                <div id="u424_div" class=""></div>
                <div id="u424_text" class="text ">
                    <p><span>Clear</span></p>
                </div>
            </div>





            <div id="u426" class="ax_default box_3">
                <div id="u426_div" class=""></div>
            </div>


            <div id="u427" class="ax_default heading_3">
                <div id="u427_div" class=""></div>
                <div id="u427_text" class="text ">
                    <p><span>Recipe List</span></p>
                </div>
            </div>


            <div id="u428" class="ax_default box_3">
                <div id="u428_div" class=""></div>
            </div>


            <div id="u429" class="ax_default heading_3">
                <div id="u429_div" class=""></div>
                <div id="u429_text" class="text ">
                    <p><span>Recipe Actions</span></p>
                </div>
            </div>


            <div id="u430" class="ax_default primary_button">
                <div id="u430_div" class=""></div>
                <div id="u430_text" class="text ">
                    <p><span>Edit Recipe</span></p>
                </div>
            </div>


            <div id="u431" class="ax_default primary_button">
                <div id="u431_div" class=""></div>
                <div id="u431_text" class="text ">
                    <p><span>Share Recipe</span></p>
                </div>
            </div>


            <div id="u432" class="ax_default primary_button">
                <div id="u432_div" class=""></div>
                <div id="u432_text" class="text ">
                    <p><span>Add to Mealplan</span></p>
                </div>
            </div>


            <div id="u433" class="ax_default primary_button">
                <div id="u433_div" class=""></div>
                <div id="u433_text" class="text ">
                    <p><span>Publish Recipe</span></p>
                </div>
            </div>


            <div id="u434" class="ax_default primary_button">
                <div id="u434_div" class=""></div>
                <div id="u434_text" class="text ">
                    <p><span>Delete Recipe</span></p>
                </div>
            </div>


            <div id="u435" class="ax_default heading_3">
                <div id="u435_div" class=""></div>
                <div id="u435_text" class="text ">
                    <p><span>Rate This Recipe</span></p>
                </div>
            </div>


            <div id="u436" class="ax_default text_field">
                <div class="rate">
                    <input type="radio" id="star5" name="rate" value="5" />
                    <label for="star5" title="text">5 stars</label>
                    <input type="radio" id="star4" name="rate" value="4" />
                    <label for="star4" title="text">4 stars</label>
                    <input type="radio" id="star3" name="rate" value="3" />
                    <label for="star3" title="text">3 stars</label>
                    <input type="radio" id="star2" name="rate" value="2" />
                    <label for="star2" title="text">2 stars</label>
                    <input type="radio" id="star1" name="rate" value="1" />
                    <label for="star1" title="text">1 star</label>
                </div>
            </div>


            <button id="u437" class="ax_default primary_button">
                <div id="u437_div" class=""></div>
                <div id="u437_text" class="text ">
                    <p><span>Rate</span></p>
                </div>
            </button>


            <div id="u438" class="ax_default box_3">
                <div id="u438_div" class=""></div>
            </div>


            <div id="u439" class="ax_default heading_3">
                <div id="u439_div" class=""></div>
                <div id="u439_text" class="text ">
                    <p><span>Difficulty</span></p>
                </div>
            </div>


            <div id="u440" class="ax_default text_field">
                <input id="u440_input" type="text" value=""/>
            </div>


            <div id="u441" class="ax_default primary_button">
                <div id="u441_div" class=""></div>
                <div id="u441_text" class="text ">
                    <p><span>Rate</span></p>
                </div>
            </div>


            <div id="u442" class="ax_default box_3">
                <div id="u442_div" class=""></div>
                <div id="u442_text" class="text ">
                    <p><span>Active Filters</span></p>
                </div>
            </div>


            <div id="u443" class="ax_default link_button">
                <div id="u443_div" class=""></div>
                <div id="u443_text" class="text ">
                    <p><span>+ Add Comment</span></p>
                </div>
            </div>


            <div id="u444" class="ax_default box_1">
                <div id="u444_div" class=""></div>
            </div>

            <form onSubmit={this.handleSubmit2}>
                <div id="u425" class="ax_default text_area">
                    {/*<div><RecipeBuilder thing={this.state.text2}/></div>*/}
                    <div >{Object.keys(this.state.recipes).map(this.renderRecipe)} </div>
                </div>
                <div id="u445" class="ax_default text_field">{/*This is the search field*/}
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </div>


                <div id="u446" class="ax_default primary_button">
                    <div id="u446_div" class=""></div>
                    <div id="u446_text" class="text ">
                        <input type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        </div>;
    }
}

export default RecipePage;



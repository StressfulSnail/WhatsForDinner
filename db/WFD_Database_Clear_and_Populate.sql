-- =========================================================
-- Initialalization
-- =========================================================
use whats_for_dinner;



-- =============================================================
-- Removal of data, observing proper foreign key hierarchy...
-- =============================================================

delete from recipe_tag where recipe_id='1';
delete from recipe_tag where recipe_id='2';
delete from recipe_tag where recipe_id='3';

delete from tag where tag_id='1';
delete from tag where tag_id='2';
delete from tag where tag_id='3';

delete from tag_type where tag_type_id='1';
delete from tag_type where tag_type_id='2';
delete from tag_type where tag_type_id='3';

delete from personal_recipe where recipe_id='1';
delete from personal_recipe where recipe_id='2';
delete from personal_recipe where recipe_id='3';

delete from comment where comment_id='1';
delete from comment where comment_id='2';
delete from comment where comment_id='3';

delete from meal_recipe where recipe_id='1';
delete from meal_recipe where recipe_id='2';
delete from meal_recipe where recipe_id='3';

delete from personal_recipe where recipe_id='1';
delete from personal_recipe where recipe_id='2';
delete from personal_recipe where recipe_id='3';

delete from account_invitation where invitation_id='1';
delete from account_invitation where invitation_id='2';
delete from account_invitation where invitation_id='3';

delete from meal where meal_id='1';
delete from meal where meal_id='2';
delete from meal where meal_id='3';

delete from meal_plan where meal_plan_id='1';
delete from meal_plan where meal_plan_id='2';
delete from meal_plan where meal_plan_id='3';

delete from comment where comment_id='1';
delete from comment where comment_id='2';
delete from comment where comment_id='3';

delete from ingredient where ingredient_id='1';
delete from ingredient where ingredient_id='2';
delete from ingredient where ingredient_id='3';

delete from ingredient_count where recipe_id='1';
delete from ingredient_count where recipe_id='2';
delete from ingredient_count where recipe_id='3';

delete from measurement_unit where unit_id='1';
delete from measurement_unit where unit_id='2';
delete from measurement_unit where unit_id='3';

delete from account where account_id='1';
delete from account where account_id='2';
delete from account where account_id='3';

delete from shared_recipe where recipe_id='1';
delete from shared_recipe where recipe_id='2';
delete from shared_recipe where recipe_id='3';

delete from recipe where recipe_id='1';
delete from recipe where recipe_id='2';
delete from recipe where recipe_id='3';


-- ======================================
-- Repopulating Database With Test Data
-- ======================================



-- Entering Account Data...
	-- all passwords are:  Scala#2k$
	INSERT into account VALUES ('1', 'Todd@gmail.com', 'Todd', '$2a$10$/sETdcazmur5ehq1B/RSuO5NxHee754Ah5.QV/258vCEolgvoxIeG', 'Debit Ending in 123', 'Todd', 'Michael', 'Silvert', '1', '1', '2019-04-07 01:01:01', '2019-04-01 01:01:01');
	INSERT into account VALUES ('2', 'Bill@gmail.com', 'Bill', '$2a$10$/sETdcazmur5ehq1B/RSuO5NxHee754Ah5.QV/258vCEolgvoxIeG', 'MC Ending in 234', 'Bill', 'Alan', 'Skoggs', '2', '1', '2019-04-07 01:01:01', '2019-04-02 02:02:02');
	INSERT into account VALUES ('3', 'Jane@gmail.com', 'Jane', '$2a$10$/sETdcazmur5ehq1B/RSuO5NxHee754Ah5.QV/258vCEolgvoxIeG', 'Not On File', 'Jane', 'Marie', 'Martinez', '3', '0', '2019-04-07 01:01:01', '2019-04-02 02:02:02');

-- Entering account_invitations...
	INSERT into account_invitation VALUES ('1', '1', 'asdf', '2019-04-07 01:01:01', '2019-04-01 01:01:01');
	INSERT into account_invitation VALUES ('2', '2', 'asdg', '2019-04-07 01:01:01', '2019-04-02 01:01:01');
	INSERT into account_invitation VALUES ('3', '3', 'asdh', '2019-04-07 01:01:01', '2019-04-03 01:01:01');

-- Entering Recipies...
	insert into recipe VALUES('1', 'Eggs', 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Egg.jpg', '1', '1', '100', 'fry egg in butter', '1', '1', '2019-04-01 01:01:01', '2019-04-01 01:01:01');
	insert into recipe VALUES('2', 'Steak', 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Cut_up_steak.jpg', '2', '2', '100', 'Cook the Steak on a medium high grill', '2', '2', '2019-04-02 02:02:02', '2019-04-02 02:02:02');
	insert into recipe VALUES('3', 'Tuna', 'https://static1.squarespace.com/static/5773d3b09f745625b2abfe20/5773d856cd0f68f3077d41cf/578a9758bebafb8c8141d8b4/1468700505065/tunasteak.jpg', '3', '3', '100', 'Cook the tuna steak on a medium high grill', '3', '3', '2019-04-03 03:03:03', '2019-04-03 03:03:03');

-- Entering Comments...
	insert into comment VALUES('1', '1', '1', '2019-04-01 01:01:01', 'This egg recipe is great!','2019-04-01 01:01:01','2019-04-01 01:01:01');
	insert into comment VALUES('2', '2', '2', '2019-04-01 02:02:02', 'This steak recpie is too simple.  Try marinading it for 30 minutes in something sweet =)','2019-04-01 02:02:02','2019-04-01 02:02:02');
	insert into comment VALUES('3', '3', '3', '2019-04-01 03:03:03', 'Tuna tastes good on the grill but nasty out of a can.','2019-04-01 03:03:03','2019-04-01 03:03:03');

-- Entering Ingredients...
	insert into ingredient VALUES('1', 'Egg', '2019-04-01 01:01:01', '2019-04-01 01:01:01');
	insert into ingredient VALUES('2', 'Porterhouse Steak', '2019-04-02 02:02:02', '2019-04-02 02:02:02');
	insert into ingredient VALUES('3', 'Tuna Fillet', '2019-04-03 03:03:03', '2019-04-03 03:03:03');

-- Entering Measurement Units...
	insert into measurement_unit VALUES('1','Grade AA','2019-04-01 01:01:01', '2019-04-01 01:01:01');
	insert into measurement_unit VALUES('2','Ounces','2019-04-02 02:02:02', '2019-04-02 02:02:02');
	insert into measurement_unit VALUES('3','Fluid Ounces','2019-04-01 03:03:03', '2019-04-03 03:03:03');

-- Entering Ingredient Counts...
	insert into ingredient_count VALUES('1','1','1','1','2019-04-01 01:01:01', '2019-04-01 01:01:01');
	insert into ingredient_count VALUES('2','2','2','16','2019-04-02 02:02:02', '2019-04-02 02:02:02');
	insert into ingredient_count VALUES('3','3','2','16','2019-04-03 03:03:03', '2019-04-03 03:03:03');

-- Entering Meal Plans...
	insert into meal_plan VALUES('1','1','Steak','2019-04-21','2019-05-04','2019-04-01 01:01:01', '2019-04-01 01:01:01');
	insert into meal_plan VALUES('2','2','Eggs','2019-04-21','2019-05-04','2019-04-02 02:02:02', '2019-04-02 02:02:02');
	insert into meal_plan VALUES('3','2','Tuna','2019-04-21','2019-05-04','2019-04-03 03:03:03', '2019-04-03 03:03:03');

-- Entering Meals...
	insert into meal VALUES('1','1','2019-04-11 08:30:00','1','Eggs for breakfast!','2019-04-01 01:01:01', '2019-04-01 01:01:01');
	insert into meal VALUES('2','2','2019-04-11 13:30:00','2','Steak for lunch!','2019-04-02 02:02:02', '2019-02-02 02:02:02');
	insert into meal VALUES('3','2','2019-04-11 16:30:00','2','Tuna for dinner!','2019-04-03 03:03:03', '2019-03-03 03:03:03');

-- Entering Meal Recipes...
	insert into meal_recipe VALUES('1','1','2019-04-01 01:01:01', '2019-04-01 01:01:01');
	insert into meal_recipe VALUES('2','2','2019-04-02 02:02:02', '2019-04-02 02:02:02');
	insert into meal_recipe VALUES('3','3','2019-04-03 03:03:03', '2019-04-03 03:03:03');
    
-- Entering Personal Recipes...
	insert into personal_recipe VALUES('1','1','This is a personal recipe:  Un-bag store bought beef jerky, then eat and enjoy!','2019-04-01 01:01:01', '2019-04-01 01:01:01');
	insert into personal_recipe VALUES('2','2','This is a personal recipe:  For disaster, do not do any planning.','2019-04-02 02:02:02', '2019-02-02 02:02:02');
    insert into personal_recipe VALUES('3','3','This is a personal recipe:  For success, go to bed early.','2019-04-02 02:02:02', '2019-02-02 02:02:02');
    
-- Entering Tag Types
	insert into tag_type VALUES('1','Type One','2019-04-01 01:01:01', '2019-04-01 01:01:01');
	insert into tag_type VALUES('2','Type Two','2019-04-02 02:02:02', '2019-04-02 02:02:02');
	insert into tag_type VALUES('3','Type Three','2019-04-01 03:03:03', '2019-04-03 03:03:03'); 
    
-- Entering Tag Data...
	insert into tag VALUES('1','1','Eggs','2019-04-01 01:01:01', '2019-04-01 01:01:01');
	insert into tag VALUES('2','2','Steak','2019-04-02 02:02:02', '2019-04-02 02:02:02');
	insert into tag VALUES('3','3','Tuna','2019-04-01 03:03:03', '2019-04-03 03:03:03'); 
    
-- Entering Recipe Tags...
	insert into recipe_tag VALUES('1','1','2019-04-01 01:01:01', '2019-04-01 01:01:01');
	insert into recipe_tag VALUES('2','2','2019-04-02 02:02:02', '2019-04-02 02:02:02');
	insert into recipe_tag VALUES('3','3','2019-04-01 03:03:03', '2019-04-03 03:03:03');    
    
-- Entering Shared Recipe Data...
	insert into shared_recipe VALUES('1','2019-04-01 01:01:01', '2019-04-01 01:01:01');
	insert into shared_recipe VALUES('2','2019-04-02 02:02:02', '2019-04-02 02:02:02');
	insert into shared_recipe VALUES('3','2019-04-01 03:03:03', '2019-04-03 03:03:03');    


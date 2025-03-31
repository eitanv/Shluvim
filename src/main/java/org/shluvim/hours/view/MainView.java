package org.shluvim.hours.view;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;
import org.shluvim.hours.model.Instructor;
import org.shluvim.hours.model.User;
import org.shluvim.hours.model.repositories.InstructorRepository;
import org.shluvim.hours.model.services.UserService;

import java.util.HashMap;
import java.util.Map;

@Route("") // (1)
public class MainView extends VerticalLayout { // (2)

    private final InstructorRepository instructorRepository;
    private final UserService userService;
    Grid<Instructor> instructorsList = new Grid<>(Instructor.class);

    static Map<String, String> headers;

    public MainView(InstructorRepository instructorRepository, UserService userService) {

        {
            headers = new HashMap<>();
            headers.put("Instructor Id", "מספר זיהוי מדריך");
            headers.put("Instructor Name", "שם מדריך");
            headers.put("Rate", "חיוב לשעה");
            headers.put("Rate Code", "קוד חיוב");
        }

        this.instructorRepository = instructorRepository;
        this.userService = userService;
        var form = new Form();

        add(new H1("שלובים - מערכת דיווח שעות"));
        add(new H2("ניהול והוספת מדריכים"));

        update();

        instructorsList.setColumns("instructorId", "instructorName", "rate", "rateCode");
        instructorsList.getColumns().forEach(c -> {
            String oldHeader = c.getHeaderText();
            String newHeader = headers.get(oldHeader);
            c.setHeader(newHeader);
        });
        instructorsList.asSingleSelect().addValueChangeListener(e ->
            form.setInstructor(e.getValue()));
        add(instructorsList, form);
        update();
    }

    void update() {
        instructorsList.setItems(instructorRepository.findAll());
    }

    class Form extends FormLayout {

        TextField instructorId = new TextField("מספר זיהוי מדריך");
        TextField instructorName = new TextField("שם מדריך");
        TextField rate = new TextField("חיוב לשעה");
        TextField rateCode = new TextField("קוד חיוב");
        TextField identityNumber = new TextField("תעודת זהות");

        Binder<Instructor> binder = new BeanValidationBinder<>(Instructor.class);
        private Instructor instructor;

        public Form() {
            var saveButton = new Button("Save");
            binder.bindInstanceFields(this);
            add(instructorId, instructorName, rate, rateCode, identityNumber, saveButton);
            //instructorId.setReadOnly(true);
            saveButton.addClickListener(click -> {

                Long newUserId = 0L;
                String name = instructorName.getValue();

                if (instructor == null) {

                    User newUser = new User();
                    newUser.setUserName(name);
                    newUser.setIdentityNumber(identityNumber.getValue());
                    newUser.setTitle("Instructor");
                    newUserId = userService.saveUser(newUser);

                    instructor = new Instructor();
                    instructor.setInstructorId(Long.parseLong(instructorId.getValue()));
                    instructor.setInstructorName(name);
                    instructor.setRateCode(rateCode.getValue());
                    instructor.setUser(newUser);
                } else {
                    User instructorUser = instructor.getUser();
                    if (instructorUser != null && !instructorUser.getUserName().equals(name)) //Meaning the instructor name changed, and need to be updated in users table also.
                    {
                        instructorUser.setUserName(name);
                        userService.saveUser(instructorUser);
                    }
                }
                try {
                    binder.writeBean(instructor);
                    instructorRepository.save(instructor);
                } catch (Exception e) {
                    System.out.println("Failed to create new instructor");
                    if (newUserId != 0L) {
                        userService.deleteUser(newUserId);
                    }
                }
                update();
            });
        }

        void setInstructor(Instructor instructor) {
            this.instructor = instructor;
            binder.readBean(instructor);
            if (instructor==null) {
                instructorId.setReadOnly(false);
                identityNumber.setValue("");
            }
            else
            {
                instructorId.setReadOnly(true);
                identityNumber.setValue(instructor.getUser().getIdentityNumber());
            }
        }
    }
}
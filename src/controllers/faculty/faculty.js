import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

//Route handler for getting a faculty member by ID
const facultyListPage = (req, res) => {
    // Get the requested sort option from the URL
    const sortBy = req.query.sort || 'name';

    // Sort the faculty using the selected option
    const faculty = getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty',
        faculty: faculty
    });
}

//Route handler for getting a faculty member by ID
const facultyDetailPage = (req, res, next) => {
    const facultyId = req.params.facultyId;
    const faculty = getFacultyById(facultyId);

    // If course doesn't exist, create 404 error
    if (!faculty) {
        const error = new Error(`Faculty member ${facultyId} not found`);
        error.status = 404;
        return next(error);
    }

    res.render('faculty/detail', {
        title: `Faculty Member -  ${faculty.name}`,
        faculty: faculty
    });
};

export { facultyListPage, facultyDetailPage };